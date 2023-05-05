<template>
  <div v-if="loadingStore.load" id="loader-wrapper">
    <div class="triangle-wrapper">
      <div class="triangle triangle-1">
        <svg class="triangle-svg" viewBox="0 0 140 141">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon class="triangle-polygon" points="70 6 136 138 4 138"></polygon>
          </g>
        </svg>
      </div>
      <div class="triangle triangle-2">
        <svg class="triangle-svg" viewBox="0 0 140 141">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon class="triangle-polygon" points="70 6 136 138 4 138"></polygon>
          </g>
        </svg>
      </div>
      <div class="triangle triangle-3">
        <svg class="triangle-svg" viewBox="0 0 140 141">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon class="triangle-polygon" points="70 6 136 138 4 138"></polygon>
          </g>
        </svg>
      </div>
      <div class="triangle triangle-4">
        <svg class="triangle-svg" viewBox="0 0 140 141">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon class="triangle-polygon" points="70 6 136 138 4 138"></polygon>
          </g>
        </svg>
      </div>
      <div class="triangle triangle-5">
        <svg class="triangle-svg" viewBox="0 0 140 141">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon class="triangle-polygon" points="70 6 136 138 4 138"></polygon>
          </g>
        </svg>
      </div>
      <p class="triangle-loading">Loading</p>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useLoadingStore } from '@/store/Loading';

export default {
  name: 'LoaderComponent',
  computed: {
    ...mapStores(useLoadingStore)
  }
}
</script>

<style lang="scss">
@use 'sass:math';

#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

$triangle-size: 150px;
$triange-speed: 2000ms;
$triangle-speed-basis: math.div(2000ms, 5);

@keyframes grow-and-fade {
  0% {
    opacity: 0;
    transform: scale(0.1) translatez(0);
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1) translatez(0);
  }
}

@keyframes pulsing-fade {
  0% {
    opacity: 0;
  }

  20% {
    opacity: 0;
  }

  40% {
    opacity: 0.8;
  }

  60% {
    opacity: 0;
  }
}

.triangle {
  animation: grow-and-fade $triange-speed linear infinite;
  height: $triangle-size;
  left: 0;
  opacity: 0;
  width: $triangle-size;
  position: absolute;
  top: 0%;
  transform: translatez(0);
  transform-origin: 50% 60%;
  will-change: opacity, transform;

  &-wrapper {
    height: $triangle-size;
    position: relative;
    width: $triangle-size;
  }

  &-loading {
    animation: pulsing-fade 6000ms ease infinite;
    color: white;
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 12px;
    font-weight: 300;
    left: 50%;
    letter-spacing: 8px;
    margin-left: 4px;
    margin-top: 10px;
    opacity: 0;
    position: absolute;
    top: 100%;
    transform: translate3d(-50%, -50%, 0);
    text-transform: uppercase;
  }

  &-svg {
    margin-top: -20px;
    opacity: 0.5;
    overflow: visible;
  }

  &-polygon {
    stroke-width: 5px;
  }

  &-1 {
    animation-delay: $triangle-speed-basis * 0;
  }

  &-1 &-polygon {
    stroke: hotpink;
  }

  &-2 {
    animation-delay: $triangle-speed-basis * 1;
  }

  &-2 &-polygon {
    stroke: aqua;
  }

  &-3 {
    animation-delay: $triangle-speed-basis * 2;
  }

  &-3 &-polygon {
    stroke: cornflowerblue;
  }

  &-4 {
    animation-delay: $triangle-speed-basis * 3;
  }

  &-4 &-polygon {
    stroke: yellow;
  }

  &-5 {
    animation-delay: $triangle-speed-basis * 4;
  }

  &-5 &-polygon {
    stroke: white;
  }
}
</style>
