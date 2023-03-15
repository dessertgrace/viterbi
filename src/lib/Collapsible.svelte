<script>
    // based on suggestions from:
    // Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
    export let headerText;

    let expanded = false
    import Katex from 'svelte-katex'
</script>

<div class="collapsible">
    <h3>
        <button aria-expanded={expanded} on:click={() => expanded = !expanded}>{headerText}
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

<style>
  .collapsible {
    display: table-caption;
    caption-side: bottom;
    width: 100%;
  }

	
	h3 {
		margin: 0;
    font-size: 18px;
	}

  .contents {
    text-align: left;
    padding: 10px;
  }
	
  button {
    background-color: var(--background, #fff);
    color: var(--gray-darkest, #282828);
    display: flex;
		justify-content: space-between;
    width: 100%;
		border: none;
		margin: 0;
		padding: 0.5em 0.5em;
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
    }
</style>