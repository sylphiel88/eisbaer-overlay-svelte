<script lang="ts">
	import { onMount } from "svelte";

    let classes = ["intro intro-start", "top-curtain", "side-curtains","curtain-left","curtain-right"]
    let curtainsOpen:boolean = false
    let introTexts = [false, false, false, false, false, false]

    onMount(()=>{
        let introSound = new Audio("http://localhost:3000/jan_intro.mp3")
        setTimeout(()=>{introSound.play()}, 2000)
        setTimeout(()=>{
            let tempClass = classes
            tempClass[0] = "intro animated"
            classes = [...tempClass]
        }, 4000)
        setTimeout(()=>{
            let tempClass = classes
            tempClass[0] = "intro animated zoomed"
            classes = [...tempClass]
        }, 19000)
        setTimeout(()=>{
            curtainsOpen = true
        },24000)
        setTimeout(()=>{
            let newIntroTexts = introTexts
            newIntroTexts[0] = true
            introTexts = [...newIntroTexts]
        },27550)
        setTimeout(()=>{
            let newIntroTexts = introTexts
            newIntroTexts[1] = true
            introTexts = [...newIntroTexts]
        }, 28000)
        setTimeout(()=>{
            let newIntroTexts = introTexts
            newIntroTexts[0] = false
            newIntroTexts[1] = false
            newIntroTexts[2] = true
            introTexts = [...newIntroTexts]
        },29800)
        setTimeout(()=>{
            let newIntroTexts = introTexts
            newIntroTexts[3] = true
            introTexts = [...newIntroTexts]
        }, 30250)
        setTimeout(()=>{
            let newIntroTexts = introTexts
            newIntroTexts[2] = false
            newIntroTexts[3] = false
            newIntroTexts[4] = true
            introTexts = [...newIntroTexts]
        },31850)
        setTimeout(()=>{
            let newIntroTexts = introTexts
            newIntroTexts[5] = true
            introTexts = [...newIntroTexts]
        }, 32300)    
    })
    
</script>
<div class={classes[0]}>
    <div class={classes[1]}></div>
    <div class={classes[2]}>
        <div class={classes[3]}>
            {#each new Array(10).fill("A") as _}
                <div></div>
            {/each}</div>
        <div class={classes[4]}>
            {#each new Array(10).fill("A") as _}
                <div></div>
            {/each}</div></div>
    {#if curtainsOpen}
    <div class="content-intro">
        {#if introTexts[0]}
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="http://localhost:3000/eisbaerlogo.png"/>
        {/if}
        {#if introTexts[1]}
            <span>presents</span>
        {/if}
        {#if introTexts[2]}
            <span class="mixed-metal">Mixed Metal</span>
        {/if}
        {#if introTexts[3]}
            <span>mit DJ Jan</span>
        {/if}
        {#if introTexts[4]}
            <span class="mixed-metal">Viel Spaß</span>
        {/if}
        {#if introTexts[5]}
            <span>mit der Musik!</span>
        {/if}
    </div>
    {/if}
</div>
<style lang="scss">
    $curtainColor:rgb(63, 6, 15);

.intro {
    position: relative;
    width: 100%;
    height: 100%;
    display:grid;
    grid-template-rows: 1fr 9fr;
    grid-template-columns: 1fr;
    border: 5px solid $curtainColor;
    transition: transform 2s ease-in;
    &>.top-curtain{
        background-color: $curtainColor;
        box-shadow: 0 0 20px black;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        z-index: 2;
        height: 200%;
    }
    &>.side-curtains{
        display: grid;
        grid-template-columns: 1fr 1fr;
        overflow: hidden;
        &>div{
            display: grid;
            grid-template-columns: repeat(10, 1fr);            
        }
        &>.curtain-right{
            height: 500%;
            transition: all 20s ease-in;
            transform: rotate(0deg) translateY(-50%);
            &>div{
                background: linear-gradient(90deg, rgb(0, 0, 0) 0%,  $curtainColor 25%,  $curtainColor 100%);
                box-shadow: inset 0 0 5px black;
            }
        }
        &>.curtain-left{
            height: 500%;
            transition: all 20s ease-in;
            transform: rotate(0deg) translateY(-50%);
            &>div{
                background: linear-gradient(90deg, $curtainColor 0%, $curtainColor 75%, rgb(0, 0, 0) 100%);
                box-shadow: inset 0 0 5px black;
            }
        }
    }
}

.content-intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 70%;
    padding: 5%;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-40%);
    &>span{
        font-size: 30pt;
    }
}

.animated > .side-curtains > .curtain-right {
    transform: translateX(1100px) rotate(-10deg) translateY(-300px)
}

.animated > .side-curtains > .curtain-left {
    transform: translateX(-1100px) rotate(10deg) translateY(-300px)
}

.zoomed {
    transform: scale(1.2);
}

.mixed-metal {
    font-size: 50pt !important;
}
</style>