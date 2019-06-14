<template>
    <div class="__sketch-screen">
        <div class="__sketch-header __sketch-gray-txt" flex="main:justify cross:center">
            <div class="__sketch-circle-s __sketch-bg-color"></div>
            <div class="__sketch-text-m __sketch-bg-color"></div>
            <div></div>
        </div>
        <div class="__sketch-tic-title __sketch-white" flex="dir:top main:center">
            <div class="__sketch-text-100 __sketch-bg-color"></div>
            <div class="__sketch-text-100 __sketch-bg-color" style="margin: 5px 0"></div>
            <div class="__sketch-text-m __sketch-bg-color"></div>
        </div>
        <div class="__sketch-ul">
            <div class="__sketch-list __sketch-white"></div>
            <div class="__sketch-list __sketch-white"></div>
        </div>
        <div class="__sketch-btm-bar __sketch-white" flex="main:justify cross:center">
            <div style="height: 100%;flex:1;-webkit-flex:1;" flex="cross:center main:center">
                <div class="__sketch-text-m __sketch-bg-color"></div>
            </div>
            <div class="__sketch-station-confirm __sketch-gray-txt" flex="main:center cross:center">
                <div class="__sketch-text-s __sketch-white"></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name:"passagerSketch"
  }
</script>