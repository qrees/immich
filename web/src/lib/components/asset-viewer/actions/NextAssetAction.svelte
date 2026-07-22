<script lang="ts">
  import { languageManager } from '#lib/managers/language-manager.svelte.ts';
  import { Icon, shortcuts } from '@immich/ui';
  import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
  import type { SwipeCustomEvent } from 'svelte-gestures';
  import { t } from 'svelte-i18n';
  import NavigationArea from '../NavigationArea.svelte';

  interface Props {
    onNextAsset: () => void;
    onSwipe?: (event: SwipeCustomEvent) => void;
  }

  let { onNextAsset, onSwipe }: Props = $props();
</script>

<svelte:window
  {@attach shortcuts([
    { shortcut: { key: 'ArrowRight' }, onShortcut: onNextAsset },
    { shortcut: { key: 'd' }, onShortcut: onNextAsset },
  ])}
/>

<NavigationArea onClick={onNextAsset} {onSwipe} label={$t('view_next_asset')}>
  <Icon icon={languageManager.rtl ? mdiChevronLeft : mdiChevronRight} size="36" aria-hidden />
</NavigationArea>
