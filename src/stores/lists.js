// stores/lists.js
import { defineStore } from "pinia";
import axios from "axios";

import {
  getUserLists,
  saveMarkah,
  updateMarkah,
  removeMarkah,
  createActivityList,
  deleteActivityList,
  renameActivityList,
} from "../services/listServices";

export const useMarkahStore = defineStore("markah", {
  state: () => ({
    lists: [],
    selectedListId: null,
    isSaved: false,
  }),

  actions: {
    // -------------------------------
    // AMBIL SEMUA LIST USER
    // -------------------------------
    async fetchAllLists(volunteerId) {
      try {
        const res = await getUserLists(volunteerId);
        const rawLists = res.data.data;

        // 🔥 Normalisasi ID supaya selalu list.id
        this.lists = rawLists.map((item) => ({
          ...item,
          id: item.id ?? item.list_id ?? item.activity_list_id,
        }));

        console.log("LISTS NORMALIZED:", this.lists);

      } catch (err) {
        console.error("Error fetch lists:", err);
      }
    },

    // -------------------------------
    // SIMPAN ACTIVITY PERTAMA KALI
    // -------------------------------
    async save(activityId, listId) {
      await saveMarkah(activityId, listId);
      this.isSaved = true;
    },

    // -------------------------------
    // PINDAH / UPDATE LIST
    // -------------------------------
    async update(activityId, listId) {
      await updateMarkah(activityId, listId);
      this.isSaved = true;
    },

    // -------------------------------
    // HAPUS ACTIVITY DARI LIST
    // -------------------------------
    async remove(activityId, listId) {
      await removeMarkah(activityId, listId);
      this.isSaved = false;
      this.selectedListId = null;
    },

    // -------------------------------
    // BUAT LIST BARU
    // -------------------------------
    async createNewList(volunteerId, name) {
      const res = await createActivityList(volunteerId, name);

      const newItem = res.data.data;

      // Normalize id juga
      this.lists.push({
        ...newItem,
        id: newItem.id ?? newItem.list_id ?? newItem.activity_list_id,
      });
    },

    // -------------------------------
    // HAPUS LIST
    // -------------------------------
    async deleteList(listId) {
      try {
        console.log("DELETE LIST ID:", listId);

        if (!listId) {
          console.error("❌ deleteList dipanggil dengan listId undefined");
          return;
        }

        await deleteActivityList(listId);

        // Hapus dari state
        this.lists = this.lists.filter((l) => l.id !== listId);

      } catch (error) {
        console.error("Gagal menghapus daftar:", error);
      }
    },

    // Ganti nama
    async renameList(listId, newName) {
    try {
      const res = await renameActivityList(listId, newName);

      // update lokal
      const index = this.lists.findIndex(l => l.id == listId);
      if (index !== -1) {
        this.lists[index].name = newName;
      }

      return res.data;

    } catch (err) {
      console.error("Rename list error:", err);
      throw err;
    }
  },
  },
});
