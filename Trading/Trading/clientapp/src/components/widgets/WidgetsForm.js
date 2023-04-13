import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Dialog from '@mui/material/Dialog'
import WidgetsFormContent from './WidgetsFormContent'
import WidgetsFormActions from './WidgetsFormActions'
import WidgetsFormTitle from './WidgetsFormTitle'

const schema = yup.object().shape({
  columns: yup
    .number()
    .required()
    .min(1, 'ColumnNumberMustBeGreaterThanOrEqualTo1')
    .max(12, 'ColumnNumberMustBeLessThanOrEqualTo12'),
  rows: yup
    .number()
    .required()
    .min(1, 'RowNumberMustBeGreaterThanOrEqualTo1')
    .max(12, 'RowNumberMustBeLessThanOrEqualTo12'),
  height: yup.number().min(50).max(1000),
})

export const WidgetsForm = ({
  handleFormSubmit,
  openWidgetsForm,
  setOpenWidgetsForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      columns: 1,
      rows: 1,
      height: 100,
    },
  })

  const onSubmit = (data) => {
    handleFormSubmit(data)
    setOpenWidgetsForm(false)
  }

  return (
    <Dialog open={openWidgetsForm} onClose={() => setOpenWidgetsForm(false)}>
      <WidgetsFormTitle
        setOpenWidgetsForm={(bool) => setOpenWidgetsForm(bool)}
      />
      <WidgetsFormContent register={register} errors={errors} />
      <WidgetsFormActions
        setOpenWidgetsForm={(bool) => setOpenWidgetsForm(bool)}
        handleSubmit={handleSubmit}
        onSubmit={(data) => onSubmit(data)}
      />
    </Dialog>
  )
}

export default WidgetsForm
