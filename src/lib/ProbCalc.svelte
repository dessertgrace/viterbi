<script>
    let DNA = "ATTCCGCGTATCCGGGGTTATGCGCCTTCCCCC";
    
    export let hiddenStates;
    let selected=[];
    
    let nucsS = DNA.split("");

    nucsS.forEach(function (nucS, index) {
        selected.push(false);
    })
    $: { 
    if ($hiddenStates.length>0) {
        $hiddenStates.forEach(function (nucS, index) {
            selected[index] = nucS;
        });
    }
    }

    
    // clone = but.cloneNode(true);

    // clone.textContent = "B";

    // nucsS.forEach(function (nuc,index) {
    //     clone = but.cloneNode();
    //     clone.textContent = index + ': ' + nuc;
    //     nucList.appendChild(clone);
    // })

    const select = (id) => {
        selected[id] = !selected[id];
    }

  </script>
  
  <div class="wrapper" id="nucWrap">
    
    {#each nucsS as name, index}
    <button class:selected={selected[index]} on:click={() => {select(index)}} class="nuc">
        {name}
    </button>
    {/each}

  </div>

  <style>

    .nuc {
        grid-row: 1/2;
    }

    button {
        /* border: none; */
        border-radius: 5px;
        transition: none;
    }

    button:active {
        border: none;
    }

    .wrapper {
        border: 1px black solid;
        margin: 1em 0;
        padding: 1em;
        background-color: white;
        overflow-x: auto;
        display: flex;
    }

    .selected {
        background-color: rgb(241, 204, 171);
    }

    @media screen and (max-width: 600px) {
    button {
        font-size: 14px;
        padding: 6px 10px;
    }
}

  </style>
  