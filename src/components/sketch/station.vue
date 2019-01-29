<template>
    <div class="__sketch-screen">
        <div class="__sketch-header __sketch-gray-txt" flex="main:justify cross:center">
            <div class="__sketch-circle-s __sketch-bg-color"></div>
            <div class="__sketch-text-m __sketch-bg-color"></div>
            <div class="__sketch-small-btn __sketch-bg-color"></div>
        </div>
        <div class="__sketch-ul">
            <div class="__sketch-station-thead __sketch-gray-txt"></div>
            <div class="__sketch-station-tr __sketch-white border-bottom-1px"></div>
            <div class="__sketch-station-tr __sketch-white border-bottom-1px"></div>
            <div class="__sketch-station-tr __sketch-white"></div>
        </div>
        <div class="__sketch-station-btm-bar">
            <div class="__sketch-station-tr __sketch-gray-txt" flex="main:justify cross:center">
                <div class="__sketch-text-m __sketch-bg-color"></div>
                <div class="__sketch-text-s __sketch-bg-color"></div>
                <div class="__sketch-text-s __sketch-bg-color"></div>
            </div>
            <div class="__sketch-station-tr __sketch-white border-bottom-1px" flex="main:justify cross:center">
                <div class="__sketch-text-s __sketch-bg-color"></div>
                <div class="__sketch-text-s __sketch-bg-color"></div>
            </div>
            <div class="__sketch-station-tr __sketch-white" flex="main:justify cross:center" style="padding-right: 0">
                <div class="__sketch-text-m __sketch-bg-color"></div>
                <div class="__sketch-station-confirm __sketch-gray-txt" flex="main:center cross:center">
                    <div class="__sketch-text-s __sketch-white"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name:"stationSketch"
  }
</script>