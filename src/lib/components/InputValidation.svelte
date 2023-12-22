<script lang="ts">
	type Props = { for: string; class?: string; message?: string; instant?: boolean };

	let { for: id, class: className, message = '', instant = false } = $props<Props>();

	function setAttributes(node: HTMLElement, element: HTMLElement) {
		node.setAttribute('id', `invalid-${id}`);
		element.setAttribute('aria-invalid', 'true');
		element.setAttribute('aria-describedby', `invalid-${id}`);
	}

	function deleteAttributes(node: HTMLElement, element: HTMLElement) {
		node.removeAttribute('id');
		element.removeAttribute('aria-invalid');
		element.removeAttribute('aria-describedby');
	}

	function onBlur(node: HTMLElement, input: HTMLElement) {
		if (
			!instant &&
			(input instanceof HTMLSelectElement ||
				((input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) &&
					!input.readOnly))
		) {
			instant = true;

			if (message) {
				node.innerText = message;
				setAttributes(node, input);
			}
		}
	}

	function onInput(node: HTMLElement, input: HTMLElement) {
		if (instant) {
			if (!message) {
				node.innerHTML = '';
				deleteAttributes(node, input);
			}

			if (node.innerText !== message) {
				node.innerText = message;
				setAttributes(node, input);
			}
		}
	}

	function invalidation(node: HTMLElement) {
		const input = document.getElementById(id);

		if (input instanceof HTMLElement) {
			if (instant && message) {
				node.innerText = message;
				setAttributes(node, input);
			}

			const listenBlur = () => onBlur(node, input);
			const listenInput = () => onInput(node, input);

			input.addEventListener('blur', listenBlur);
			input.addEventListener('input', listenInput);

			return {
				destroy() {
					input.removeEventListener('blur', listenBlur);
					input.removeEventListener('input', listenInput);
				}
			};
		}
	}
</script>

<span use:invalidation class={className}></span>
