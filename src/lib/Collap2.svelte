<script>
    // based on suggestions from:
    // Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
    export let headerText;

    export let expanded = false
    import Katex from 'svelte-katex'

</script>

<div class="wrap"> 
<div class="collapsible">
    <h3 class="buttWrap">
        <button aria-expanded={expanded} on:click={() => expanded = !expanded} class="top">
        {headerText}
        <svg viewBox="0 0 30 30" fill="none" >
            <path class="vert" d="M15 1V29" stroke="black" stroke-width="2"/>
            <path d="M1 15L29 15" stroke="black" stroke-width="2"/>
        </svg>
        </button>
    </h3>
    
    <div class='contents' hidden={!expanded}>
        <slot></slot>
    </div>
</div>
</div>

<style>
    .buttWrap {
        /* position: absolute;
        top: -3em;
        right: 10px; */
        display: flex;
        justify-content: right;
        margin-top: 0.9em;
        margin-bottom: 0;
    }
    .top {
        text-align: right;
        justify-content: right;
    }

    .top svg {
        padding-left: 10px;
    }

  .collapsible {
    display: table-caption;
    caption-side: bottom;
    width: 100%;
  }

  .wrap {
    position: relative;
    display: table;
    width: 100%;
  }

	
	h3 {
		margin: 0 1em;
        font-size: 16px;
        font-weight: 400;
        border-top: 1px lightgray solid;
	}

  .contents {
    text-align: left;
    margin: 0px 1em;
    padding: 0em 0.3em;
    padding-bottom: 0.5em;
    margin-bottom: 1em;
    border-bottom: 1px lightgray solid;
  }
	
  button {
    background-color: var(--background, #fff);
    color: var(--gray-darkest, #282828);
    display: flex;
    justify-content: space-between;
    /* width: 130px; */
    border: none;
    padding: 0.3em 0.5em;
    margin: 0em 0;
    margin-top: 0px;
  }
  button svg {
    margin: auto auto;
  }

  /* button[aria-expanded="true"] {
    border-bottom: 1px solid var(--gray-light, #eee);
  } */

    button[aria-expanded="true"] .vert {
        display: none;
    }

    button:focus svg{
        outline: 2px solid;
    }

    /* button [aria-expanded="true"] rect {
        fill: currentColor;
    } */

    svg {
        height: 1em;
				width: 1em;
    }

    @media screen and (max-width: 600px) {
      button, .contents {
        font-size: 14px;
      }
      /* .buttWrap {
        position: absolute;
        top: -3em;
        top: 0px;
        right: 10px;
        display: flex;
        justify-content: right;
    } */
    /* button {
        margin-top: 0.9em;
    } */
    }
</style>