<template>
    <transition name="fade">
        <div id="loader">
            <div class="loader">
                <svg viewBox="0 0 80 80">
                    <circle id="test" cx="40" cy="40" r="32"></circle>
                </svg>
            </div>
            <p class="vs-input__message--primary">{{ loaderMessage }}</p>
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Loader",
        computed: {
            ...mapGetters(["loaderMessage"])
        },
        created() {
            document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        },
        beforeDestroy() {
            document.getElementsByTagName('body')[0].style.overflowY = 'auto';
        }
    }
</script>

<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-to {
        opacity: 1;
    }
    #loader {
        display: flex;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 5;
        background-color: rgba(115, 76, 241, 0.05);

        & > p {
            font-weight: 700;
        }
    }

    .loader {
        --path: #2F3545;
        --dot: #734cf1;
        --duration: 3s;
        width: 44px;
        height: 44px;
        position: relative;

        &:before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: absolute;
            display: block;
            background: var(--dot);
            top: 37px;
            left: 19px;
            transform: translate(-18px, -18px);
            animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        svg {
            display: block;
            width: 100%;
            height: 100%;

            circle {
                fill: none;
                stroke: var(--path);
                stroke-width: 5px;
                stroke-linejoin: round;
                stroke-linecap: round;
            }

            circle {
                stroke-dasharray: (200 / 4 * 3) (200 / 4) (200 / 4 * 3) (200 / 4);
                stroke-dashoffset: 75;
                animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
            }
        }
    }

    @keyframes pathCircle {
        25% {
            stroke-dashoffset: 125;
        }
        50% {
            stroke-dashoffset: 175;
        }
        75% {
            stroke-dashoffset: 225;
        }
        100% {
            stroke-dashoffset: 275;
        }
    }

    @keyframes dotRect {
        25% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(18px, -18px);
        }
        75% {
            transform: translate(0, -36px);
        }
        100% {
            transform: translate(-18px, -18px);
        }
    }

    .loader {
        display: inline-block;
        margin: 0 16px;
    }
</style>
