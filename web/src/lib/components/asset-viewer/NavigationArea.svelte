<script lang="ts">
  import type { Snippet } from 'svelte';
  import { useSwipe, type SwipeCustomEvent } from 'svelte-gestures';

  interface Props {
    onClick: (e: MouseEvent) => void;
    onSwipe?: (event: SwipeCustomEvent) => void;
    label: string;
    children?: Snippet;
  }

  let { onClick, onSwipe, label, children }: Props = $props();

  // A swipe short enough to end back inside the button is also reported as a click, which would
  // navigate a second time. Reset on every new gesture so a plain click is never swallowed.
  let swiped = false;

  const handleSwipe = (event: SwipeCustomEvent) => {
    swiped = true;
    onSwipe?.(event);
  };

  const handleClick = (event: MouseEvent) => {
    if (swiped) {
      return;
    }
    onClick(event);
  };
</script>

<button
  type="button"
  class="mx-4 my-auto rounded-full p-3 text-gray-500 transition hover:bg-gray-500 hover:text-white"
  aria-label={label}
  onpointerdown={() => (swiped = false)}
  onclick={handleClick}
  {...useSwipe(handleSwipe)}
>
  {@render children?.()}
</button>
