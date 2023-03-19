<script>
    import Katex from 'svelte-katex'
    export let count = 1;
    export let started=false;
    export let fillAll=false;

    function toggleStart() {
        started = true;
    }

    function fillAllTable() {
        fillAll=true;
    }

    // let count = 1
    function increaseNum() {
        if (count < 35){
            count +=1;
        }
    }   
    function decreaseNum() {
        if (count > 1){
            count -=1;
        }
    }
     
</script>

<div class="outer">

    
<div class="wrap">

    <div class="wrapStart">
        <button on:click={toggleStart}> Start</button>
    </div>
    
    <p >Let's calculate <Katex>{String.raw`P_{`}{count}{String.raw`}`}.</Katex> </p>

    <div class="innerWrap">
        
        <button on:click="{decreaseNum}">➖</button>
        <div class="num">
            <Katex> i = {count} </Katex>
        </div>
        <button on:click="{increaseNum}">➕</button>
    </div>

    <div class="wrapStart">
        <button on:click={fillAllTable}> Skip to end</button>
    </div>
</div>
</div>

<style>
    .outer {
        max-width: 640px;
        margin: 0 auto;
    }

p {
    margin: 1em;
    margin-top: 1em;
    align-self: center;
}
.num {
    width: 90px;
}

.wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 0.2em;
    /* margin-bottom: 0.5em; */
}

.wrapStart{
    margin: auto auto;
}
.wrapStart button {
    padding: 0.5em 1em;
    background-color: rgb(238, 238, 238);
}

.innerWrap {

    margin: 1em auto;
    border-radius: 10px;
    display: flex;
    padding: 0.2em;
    /* margin-left: 0.5em; */
    /* margin: auto auto; */
    /* border: 1px black solid; */
    background-color: rgb(238, 238, 238);
    width: 120px;
}

button {
    padding: 0 0.3em;
    margin: 0;
}

</style>