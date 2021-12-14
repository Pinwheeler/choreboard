import { Grid, Stack, Typography } from "@mui/material"
import React from "react"
import { AllItems, ItemSlot } from "../../../../core/models/Item.model"
import { ItemSprite } from "../../../ItemSprite"

export const Store: React.FC = () => {
  return (
    <Stack>
      {Object.keys(AllItems).map((itemSlot) => (
        <Stack>
          <Typography variant="h5">{itemSlot}</Typography>
          <Grid container>
            {AllItems[itemSlot as ItemSlot].map((itemOfSlot) => (
              <Grid item>
                <ItemSprite item={itemOfSlot} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  )
}
