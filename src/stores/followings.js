// src/stores/following.js
import { defineStore } from 'pinia';
import { ref, computed} from 'vue';
import { getFollowing, getFollower, createFollow, updateFollow, unfollow } from '../services/followingService';

export const useFollowingStore = defineStore('following', () => {
  const followingList = ref([]);
  const followerList = ref([]);

  // Ambil semua following
  const fetchFollowing = async () => {
    try {
      const res = await getFollowing();
      followingList.value = res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Ambil follower by id
  const fetchFollower = async (id) => {
    try {
      const res = await getFollower(id);
      followerList.value = res.data.data.volunteers;
    } catch (error) {
      console.error(error);
    }
  };

  // Follow user
  const addFollow = async (data) => {
    try {
      await createFollow(data);
      await fetchFollowing(); 
    } catch (error) {
      console.error(error);
    }
  };

  // Update follow notification
  const notifyFollow = async (id, data) => {
    try {
      await updateFollow(id, data);
      await fetchFollowing(); 
    } catch (error) {
      console.error(error);
    }
  };

  // Unfollow user
  const removeFollow = async (id) => {
    try {
      await unfollow(id);
      await fetchFollowing(); 
    } catch (error) {
      console.error(error);
    }
  };

  //total following user
  const totalFollowing = computed(() => followingList.value.length);

  return { followingList, followerList, totalFollowing, fetchFollowing, fetchFollower, addFollow, notifyFollow, removeFollow };
});
