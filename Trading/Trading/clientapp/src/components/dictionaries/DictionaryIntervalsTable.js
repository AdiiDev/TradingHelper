import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { intervalsColumns } from '../../data'
import SortedTable from '../sortedTable/SortedTable'
import DictionaryForm from './DictionaryForm'
import { setIntervals } from '../../services/dictionary/IntervalsSlice'
import IntervalService from '../../services/dictionary/IntervalService'

/**
 * This component is not working correctly
 * 
 */

const DictionaryIntervalsTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const intervals = useSelector((state) => state.intervals.intervals)
  const [editData, setEditData] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleFormSubmit = async (data) => {
    const intervalData = JSON.stringify({
      id: data.id,
      label: data.label,
      interval: data.interval,
      hide: JSON.parse(data.hide)
    })
    console.log(intervalData)
    const res = await IntervalService.AddOrUpdate(intervalData)

    if (res.isError) {
      toast.error(t('ErrorUpdate'))
      return
    }
    toast.success(t('Added'))
    const updatedIntervals = [
      ...intervals.filter((inter) => inter.id !== res.result.id),
      res.result,
    ]
    setEditData(null)
    dispatch(setIntervals(updatedIntervals))
    setOpenDialog(false)
  }

  const deleteInterval = async (id) => {
    const res = await IntervalService.Delete(id)
    if (res.isError) {
      toast.error(t('ErrorDelete'))
      return
    }
    toast.success(t('Deleted'))
    setOpenDialog(false)

    const response = await IntervalService.Get()
    if (!response.isError) {
      dispatch(setIntervals(response.result))
    }
  }

  return (
    <>
      <DictionaryForm
        title={'Intervals'}
        dataInputs={intervalsColumns}
        openDialog={openDialog}
        setOpenDialog={(bool) => setOpenDialog(bool)}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
      <SortedTable
        columns={intervalsColumns}
        onDelete={deleteInterval}
        storedData={intervals}
        editDataTable={(data) => setEditData(data)}
        setOpenDialog={(bool) => setOpenDialog(bool)}
      />
    </>
  )
}
export default DictionaryIntervalsTable
