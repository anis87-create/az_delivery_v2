/**
 * Minimal lit-html-like template rendering for demonstration purposes.
 * Not a full implementation.
 */

export function html(strings, ...values) {
    return { strings, values };
}

export function render(result, container) {
    let htmlString = '';
    for (let i = 0; i < result.strings.length; i++) {
        htmlString += result.strings[i];
        if (i < result.values.length) {
            htmlString += result.values[i];
        }
    }
    container.innerHTML = htmlString;
}