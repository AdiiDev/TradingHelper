import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Popover from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const TradesTablePopover = ({
  moveColumnDown,
  moveColumnUp,
  toggleColumnVisibility,
  handleColumnWidthChange,
  handleShowAllColumns,
  columnWidths,
  columns,
  columnVisibility,
  showAllColumns,
}) => {
  const { t } = useTranslation()
  const anchorRef = useRef(null)
  const [openSettingsPopover, setOpenSettingsPopover] = useState(false)
  return (
    <>
      <div style={{ marginRight: '50px' }} className="button-drawerOpen">
        <Tooltip title={t('TableSettings')}>
          <Button onClick={() => setOpenSettingsPopover(true)} ref={anchorRef}>
            <MoreVertIcon fontSize="large" />
          </Button>
        </Tooltip>
      </div>
      <Popover
        open={openSettingsPopover}
        onClose={() => setOpenSettingsPopover(false)}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: '10px' }}>
            {t('TableSettings')}
          </Typography>
          {columns.map((column, index) => (
            <div key={column.id}>
              {column.id === 'actions' ? null : (
                <>
                  <Button onClick={() => moveColumnUp(index)}>
                    <KeyboardArrowUpIcon />
                  </Button>
                  <Button onClick={() => moveColumnDown(index)}>
                    <ArrowDropDownIcon />
                  </Button>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={columnVisibility[column.id]}
                        onChange={() => toggleColumnVisibility(column.id)}
                      />
                    }
                    label={t(column.label)}
                  />
                </>
              )}
              {column.id === 'actions' ? null : (
                <>
                  {' '}
                  <Typography
                    id={`slider-label-${column.id}`}
                    variant="caption"
                  >
                    {`${t('ColumnWidth')}: ${columnWidths[column.id] || 200}px`}{' '}
                  </Typography>
                  <Slider
                    sx={{ marginLeft: '10px' }}
                    color="secondary"
                    value={columnWidths[column.id] || 200}
                    min={100}
                    max={500}
                    step={10}
                    onChange={(event, newValue) =>
                      handleColumnWidthChange(column.id, newValue)
                    }
                    aria-labelledby={`slider-label-${column.id}`}
                  />
                  <Divider />
                </>
              )}
            </div>
          ))}
          <FormControlLabel
            control={
              <Switch
                checked={showAllColumns}
                onChange={handleShowAllColumns}
              />
            }
            label={showAllColumns ? t('HideAll') : t('ShowAll')}
          />
        </Box>
      </Popover>
      <div style={{ marginRight: '50px' }} className="button-drawerOpen">
        <Tooltip title={t('TableSettings')}>
          <Button onClick={() => setOpenSettingsPopover(true)} ref={anchorRef}>
            <MoreVertIcon fontSize="large" />
          </Button>
        </Tooltip>
      </div>
    </>
  )
}

export default TradesTablePopover
