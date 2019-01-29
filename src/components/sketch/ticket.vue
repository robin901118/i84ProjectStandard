<template>
    <div class="__sketch-screen">
        <div class="__sketch-header __sketch-gray-txt" flex="main:justify cross:center">
            <div class="__sketch-circle-s __sketch-bg-color"></div>
            <div class="__sketch-text-s __sketch-bg-color"></div>
            <div></div>
        </div>
        <div class="__sketch-tic-title __sketch-white" flex="dir:top main:center">
            <div class="__sketch-text-100 __sketch-bg-color"></div>
            <div class="__sketch-text-m __sketch-bg-color" style="margin: 4px 0 10px 0"></div>
            <div flex="main:justify cross:center">
                <div class="__sketch-text-s __sketch-bg-color"></div>
                <div class="__sketch-circle-xs __sketch-bg-color"></div>
            </div>
        </div>
        <div class="__sketch-ul">
            <div class="__sketch-list __sketch-white"></div>
            <div class="__sketch-list __sketch-white"></div>
        </div>
        <div class="__sketch-btm-bar __sketch-white" flex="main:center cross:center">
            <div class="__sketch-bg-color __sketch-text-xl"></div>
        </div>
    </div>
</template>
<script>
  export default {
    name:"ticketSketch"
  }
</script>