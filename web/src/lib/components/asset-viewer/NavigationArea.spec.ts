import type { ComponentProps } from 'svelte';
import { render } from 'vitest-browser-svelte';
import NavigationArea from './NavigationArea.svelte';

const pointer = (element: Element, type: string, clientX: number) =>
  element.dispatchEvent(
    new PointerEvent(type, { pointerId: 1, pointerType: 'touch', isPrimary: true, clientX, clientY: 0, bubbles: true }),
  );

// A swipe is only recognised when it covers more than 60px within 300ms.
const swipeLeft = (element: Element) => {
  pointer(element, 'pointerdown', 200);
  pointer(element, 'pointermove', 0);
  pointer(element, 'pointerup', 0);
};

const renderButton = async (props: Omit<ComponentProps<typeof NavigationArea>, 'label'>) => {
  const { getByLabelText } = await render(NavigationArea, { ...props, label: 'view_next_asset' });
  return getByLabelText('view_next_asset').element() as HTMLElement;
};

describe('NavigationArea component', () => {
  it('calls onClick when the button is clicked', async () => {
    const onClick = vi.fn();
    const button = await renderButton({ onClick });

    button.click();

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onSwipe when a swipe starts on the button', async () => {
    const onSwipe = vi.fn();
    const button = await renderButton({ onClick: vi.fn(), onSwipe });

    swipeLeft(button);

    expect(onSwipe).toHaveBeenCalledOnce();
    expect(onSwipe.mock.calls[0][0].detail.direction).toBe('left');
  });

  it('does not also call onClick when a swipe ends back inside the button', async () => {
    const onClick = vi.fn();
    const onSwipe = vi.fn();
    const button = await renderButton({ onClick, onSwipe });

    swipeLeft(button);
    button.click();

    expect(onSwipe).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('still calls onClick for a click following an earlier swipe', async () => {
    const onClick = vi.fn();
    const button = await renderButton({ onClick, onSwipe: vi.fn() });

    swipeLeft(button);
    button.click();

    pointer(button, 'pointerdown', 0);
    pointer(button, 'pointerup', 0);
    button.click();

    expect(onClick).toHaveBeenCalledOnce();
  });
});
