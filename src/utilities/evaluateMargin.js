function evaluateMargin(alignment) {
    let margin = '0 0 0 auto'
    if (alignment === 'left') {
        margin = '0 auto 0 '
    } else if (alignment === 'center') {
        margin = 'auto 0 auto'
    }
    return margin
}

export {evaluateMargin}