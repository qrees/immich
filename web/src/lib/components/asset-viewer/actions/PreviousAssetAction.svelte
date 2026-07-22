<script lang="ts">
  import { languageManager } from '#lib/managers/language-manager.svelte.ts';
  import { Icon, shortcuts } from '@immich/ui';
  import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
  import type { SwipeCustomEvent } from 'svelte-gestures';
  import { t } from 'svelte-i18n';
  import NavigationArea from '../NavigationArea.svelte';

  interface Props {
    onPreviousAsset: () => void;
    onSwipe?: (event: SwipeCustomEvent) => void;
  }

  let { onPreviousAsset, onSwipe }: Props = $props();
</script>

<svelte:window
  {@attach shortcuts([
    { shortcut: { key: 'ArrowLeft' }, onShortcut: onPreviousAsset },
    { shortcut: { key: 'a' }, onShortcut: onPreviousAsset },
  ])}
/>

<NavigationArea onClick={onPreviousAsset} {onSwipe} label={$t('view_previous_asset')}>
  <Icon icon={languageManager.rtl ? mdiChevronRight : mdiChevronLeft} size="36" aria-hidden />
</NavigationArea>
