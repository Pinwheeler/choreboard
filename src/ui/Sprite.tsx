import React from "react"

interface Props {
  spriteSheetAsset: string
  spriteItemSize: { width: number; height: number }
  spriteSheetIndex: { x: number; y: number }
  style?: React.CSSProperties
}

export const Sprite: React.FC<Props> = (props) => {
  const { spriteSheetAsset, spriteItemSize, spriteSheetIndex } = props
  const xIncrement = spriteItemSize.width * spriteSheetIndex.x
  const yIncrement = spriteItemSize.height * spriteSheetIndex.y
  return (
    <div
      style={{
        ...props.style,
        background: `url(${spriteSheetAsset}) no-repeat`,
        backgroundPositionX: -xIncrement,
        backgroundPositionY: -yIncrement,
        width: spriteItemSize.width,
        height: spriteItemSize.height,
      }}
    />
  )
}
