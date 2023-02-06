const paraseCoder=(coder)=> {
    const _coder=coder.split(".")
    const level=_coder.length
    const paraent=_coder.slice(0,level-1).join(".")
    return [paraent,level]
}

export default paraseCoder