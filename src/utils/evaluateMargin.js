const MARGIN_MAP = {
    left: '0 auto 0 ',
    center: 'auto 0 auto',
    right: '0 0 0 auto'
}

export function evaluateMargin(alignment = 'right') {
    return MARGIN_MAP[alignment] || MARGIN_MAP['right'];
}
