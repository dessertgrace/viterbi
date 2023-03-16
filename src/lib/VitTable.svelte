<script>
    import Katex from 'svelte-katex'

    let DNA = "ATTCCGCGTATCCGGGGTTATGCGCCTTCCCCC";
    let nucsS = DNA.split("");

    let selected=[];
    nucsS.forEach( function (nucS, index) {
        selected.push(false);
    })
    let lowGCP=[];
    nucsS.forEach( function (nucS, index) {
        lowGCP.push(0);
    })
    let highGCP=[];
    nucsS.forEach( function (nucS, index) {
        highGCP.push(0);
    })

    const select = (id) => {
        selected[id] = !selected[id];
    }

</script>

<div class="wrapper">

    <div class="scrollR">
  <table>
      
      <tr>
        <th></th>
        {#each nucsS as name, index}
            <td>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class:selected={selected[index]} on:click={() => {select(index)}} class="selected nuc">
                <strong> {name} </strong>
            </div>
            </td>
        {/each}
      </tr>
      <tr>
          <th>low-GC</th>
          {#each nucsS as name, index}
                <td>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class:selectedProb={selected[index]} on:click={() => {select(index)}} class="prob">
                    <!-- {lowGCP[index]} -->
                    <Katex>{String.raw`P_{`}{index},lowGC{String.raw`}`}</Katex>
                </div>
                </td>
            {/each}
          
      </tr>
      <tr>
          <th>high-GC</th>
          {#each nucsS as name, index}
                <td>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class:selectedProb={selected[index]} on:click={() => {select(index)}} class="prob">
                    <!-- {highGCP[index]} -->
                    <Katex>{String.raw`P_{`}{index},highGC{String.raw`}`}</Katex>
                </div>
                </td>
            {/each}
      </tr>
     
      </table>
      
      <div id="row3">
        <p> scroll <i class="arrow right" ></i> </p>
    </div>
</div>

</div>


<style>
    .nuc {
        cursor: default;
    }

  .wrapper{
    position: relative;
        border: 1px black solid;
        padding: 1em;
        background-color: white;
  }

  .titleRow {
      border: 1x black solid;
      border-collapse: collapse;
      padding: 1.5ch;
      text-align: start !important;
      margin: 0 auto;
      margin: 10px;
      
  }

  table, th, tr, td {
      border: 1px black solid;
      border-collapse: collapse;
      padding: 1ch;
      align-items: center;
      font-size: 17px;
  }

  table {
    grid-row: 1/2;
    width: 1900px;
    background-color: #2f1874;
    color: white;
    /* border: 2px black solid; */
    margin: 0px auto;
    /* margin-top: 20px; */
    /* max-width: 100%; */
    /* max-width: 100px; */
  }

  .scrollR {
        overflow-x: auto;
        display: grid;
        gap: 5px;
    }

    #row3 {
        grid-row: 2/3;
        height: 40px;
    }

    #row3 p {
        position: absolute;
        bottom: 20px;
        right: 10px;
        margin: 0px;
    }

    .arrow {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
    }

    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

  @media screen and (max-width: 600px) {
    table, th, tr, td {
    font-size: 14px;
  }
}



  </style>