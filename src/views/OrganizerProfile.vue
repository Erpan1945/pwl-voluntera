<script setup>
import Navbar from '@/components/Navbar.vue';

</script>

<template>
    <Navbar />
    <div class="w-full max-w-3/4 !mx-auto !mt-4">
        <div class="flex">
            <img src="../assets/BackIcon.svg"/>
            <p class="text text-base text-[#4A5565] !ml-2">Kembali</p>
        </div>

        <div class="w-full flex !mx-auto p-5 rounded-lg border border-black/10 !mt-2" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
            <div class="flex flex-1">
                <div class="!mr-4 items-center">
                    <img src="../assets/OrganizerProfile.svg" class="lg:w-[6rem] lg:h-[6rem]"></img>
                </div>

                <div class="self-center">
                    <div class="w-full flex !space-x-3">
                        <h1 class="!text-xl text text-black">Yayasan Peduli Sesama</h1>
                        <button class="text !text-sm text-[#1447E6] !py-1 !px-3 rounded-xl" style="background-color: #DBEAFE;">
                            Penyelenggara
                        </button>
                    </div>
                    <p class="text !text-base text-[#4A5565]">Organizer@test.com</p>
                    <RouterLink to="/follower" class="inline-block max-w-fit">
                        <p class="text text-[#4A5565] max-w-fit">
                        <span class="!font-bold">234</span> Pengikut
                        </p>
                    </RouterLink>
                </div>
            </div>
            
            <div class="flex items-end space-x-2">
                <div class="flex items-end ml-auto space-x-2">
                    <button class="flex justify-center items-center !px-4 !py-2 rounded-xl text-center self-end !mr-3" style="background-color: #E5E7EB; color: #364153;">
                        <img src="../assets/OrganizerIconBlack.svg" class="max-w-4 max-h-4 !mr-2"></img>
                        Mengikuti
                    </button>
                    <button class="!px-4 !py-2  rounded-lg flex items-center justify-center" style="background-color: #E5E7EB;">
                        <img src="../assets/NotificationOn.svg" class="max-w-10 max-h-10 p-[2px]">
                    </button>
                </div>
            </div>
        </div>

        
        <div class="w-full !mx-auto p-5 rounded-lg border border-black/10 !mt-6" style="background-color: white; border: 1px solid rgba(0, 0, 0, 0.10); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);">
            <h1 class="text !text-lg text-black !mb-6">Informasi Profil</h1>

            <div>
                <label class="text text-[#364153]">Nama Organisasi</label>
                <div class="flex items-center !mb-6">
                    <img />
                    <p class="text text-black">Yayasan Peduli Sesama</p>
                </div>

                <label class="text text-[#364153]">Nama Organisasi</label>
                <div class="flex items-center !mb-6">
                    <img />
                    <p class="text text-black">Yayasan Peduli Sesama</p>
                </div>

                <label class="text text-[#364153]">Nama Organisasi</label>
                <div class="flex items-center !mb-6">
                    <img />
                    <p class="text text-black">Yayasan Peduli Sesama</p>
                </div>

                <label class="text text-[#364153]">Nama Organisasi</label>
                <div class="flex items-center !mb-6">
                    <img />
                    <p class="text text-black">Yayasan Peduli Sesama</p>
                </div>

                <label class="text text-[#364153]">Nama Organisasi</label>
                <div class="flex items-center !mb-6">
                    <img />
                    <p class="text text-black">Yayasan Peduli Sesama</p>
                </div>
            </div>
        </div>
    </div>
</template>