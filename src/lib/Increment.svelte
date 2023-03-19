<script>
    import Katex from 'svelte-katex'
    export let count = 1;
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
    <p>Let's calculate the probability of the optimal path of length </p>
    <div class="innerWrap">

    
    <button on:click="{decreaseNum}">➖</button>
    <div class="num">
        <Katex> i = {count} </Katex>
    </div>
    <button on:click="{increaseNum}">➕</button>
</div>
</div>
</div>

<style>
    .outer {
        max-width: 630px;
        margin: 0 auto;
    }

p {
    margin: 0.2em;
    align-self: center;
}
.num {
    width: 90px;
}

.wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5em;
    margin-bottom: 0.5em;
}
.innerWrap {
    margin: 0 auto;
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