<script>

  </script>
  
  <div class="wrapper">

    <table>
        <tr class="titleRow" >
            <th colspan="3" >Transition Probabilities</th>
        </tr>
        
        <tr>
        <th></th>
        <th>low-GC</th>
        <th>high-GC</th>
        </tr>
        <tr>
            <th>low-GC</th>
            <td>0.99</td>
            <td>0.01</td>
        </tr>
        <tr>
            <th>high-GC</th>
            <td>0.05</td>
            <td>0.95</td>
        </tr>
       
        </table>

        <table>
          <tr class="titleRow" >
              <th colspan="5" >Emission Probabilities</th>
          </tr>
          
          <tr>
              <th></th>
          <th>A</th>
          <th>T</th>
          <th>G</th>
          <th>C</th>
          </tr>
          <tr>
              <th>low-GC</th>
              <td>0.3</td>
              <td>0.3</td>
              <td>0.2</td>
              <td>0.2</td>
          </tr>
          <tr>
              <th>high-GC</th>
              <td>0.1</td>
              <td>0.1</td>
              <td>0.4</td>
              <td>0.4</td>
          </tr>
          
          </table>


</div>
  
    <!-- <div class=buttonWrap on:click={revealAll} on:keypress={revealAll}>
      <button> reveal </button>
    </div> -->
  
  <style>

    .wrapper{
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
        max-width: 800px;
        /* margin: auto auto; */
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
      background-color: #2f1874;
      color: white;
      /* border: 2px black solid; */
      margin: 20px auto;
      /* margin-top: 20px; */
      /* max-width: 100%; */
      /* max-width: 100px; */
    }
  
    @media screen and (max-width: 600px) {
      table, th, tr, td {
      font-size: 14px;
    }
  }
  
  
  
    </style>