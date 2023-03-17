import {
  Button,
  Calendly,
  Checkbox,
  Chips,
  Countdown,
  DatePicker,
  Modal,
  Radio,
  Select,
  Tabs,
  Tag,
  TextField,
  TipCard,
  Toast,
  Toggle,
} from '@elements'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Instagram, Modalcheckicon } from '@icons'
import { MenuItem } from '@mui/material'
import dayjs from 'dayjs'
import { type NextPage } from 'next'
import { useState } from 'react'
import { useCalendlyEventListener } from 'react-calendly'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { NextSeo } from 'next-seo'

const Artex: NextPage = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const [isOpen1, setIsOpen1] = useState(false)

  function closeModal1() {
    setIsOpen1(false)
  }

  function openModal1() {
    setIsOpen1(true)
  }

  const [isOpen2, setIsOpen2] = useState(false)

  function closeModal2() {
    setIsOpen2(false)
  }

  function openModal2() {
    setIsOpen2(true)
  }

  const [isOpen3, setIsOpen3] = useState(false)

  function closeModal3() {
    setIsOpen3(false)
  }

  function openModal3() {
    setIsOpen3(true)
  }

  const [isOpen4, setIsOpen4] = useState(false)

  function closeModal4() {
    setIsOpen4(false)
  }

  function openModal4() {
    setIsOpen4(true)
  }

  const [isChipsEnabled, setIsChipsEnabled] = useState(false)

  const [isChipsEnabled2, setIsChipsEnabled2] = useState(false)

  function handleChipsClick() {
    setIsChipsEnabled(!isChipsEnabled)
  }

  function handleChipsClick2() {
    setIsChipsEnabled2(!isChipsEnabled2)
  }

  const [isOpenCalendly, setIsOpenCalendly] = useState(false)

  function closeCalendly() {
    setIsOpenCalendly(false)
  }

  function openCalendly() {
    setIsOpenCalendly(true)
  }

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('onProfilePageViewed'),
    onDateAndTimeSelected: () => console.log('onDateAndTimeSelected'),
    onEventTypeViewed: () => console.log('onEventTypeViewed'),
    onEventScheduled: (e) => console.log(e.data.payload),
  })

  const [enabledToggle, setEnabledToggle] = useState(false)

  const handleClick = () => {}

  interface FormDataType {
    name: string
    email: string
    yearOfStudy: string
    team: string
    equipments: string[]
    eventDate: Date | null
  }

  const defaultValues: FormDataType = {
    name: '',
    email: '',
    yearOfStudy: '',
    team: '',
    equipments: [],
    eventDate: null,
  }

  const { handleSubmit, control, setValue, setError, watch } =
    useForm<FormDataType>({
      defaultValues: defaultValues,
      mode: 'onBlur',
    })

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    console.log(data)
    toast.success('Form telah berhasil dikumpul!')
  }

  return (
    <>
      <NextSeo title="Artex" description="Design System PERAK 2023" />
      <main className="flex min-h-screen justify-center bg-cream-light">
        <div className="flex w-full max-w-[1440px] flex-col space-y-20 pt-16 pb-5 md:p-20 md:pt-24">
          <div className="relative font-retro text-7xl">
            <p className="absolute top-1 left-1 p-5 text-primary md:p-6">
              Artex Design System 2023
            </p>
            <p className="p-5 text-blue-normal md:p-6">
              Artex Design System 2023
            </p>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Typography</p>
            <div className="mt-5 p-2 md:p-0 md:pl-5">
              <p className="text-orange-1 font-poppins text-xl font-bold">
                Display
              </p>
              <div className="w-fit space-y-5 rounded-lg border border-primary p-3 md:p-10">
                <p className="font-retro text-display-large text-primary">
                  Display Large - 57/64 . 0
                </p>
                <p className="font-retro text-display-medium text-primary">
                  Display Medium - 45/52 . 0
                </p>
                <p className="font-retro text-display-small text-primary">
                  Display Small - 36/44 . 0
                </p>
              </div>
            </div>
            <div className="mt-5 p-2 md:p-0 md:pl-5">
              <p className="text-orange-1 font-poppins text-xl font-bold">
                Headline
              </p>
              <div className="w-fit space-y-5 rounded-lg border border-primary p-3 md:p-10">
                <p className="font-poppins text-headline-large text-primary">
                  Headline Large - 32/40 . 0
                </p>
                <p className="font-poppins text-headline-medium text-primary">
                  Headline Medium - 28/36 . 0
                </p>
                <p className="font-poppins text-headline-small text-primary">
                  Headline Small - 24/32 . 0
                </p>
                <p className="font-poppinsBold text-headline-large font-extrabold text-primary">
                  Headline Large - 32/40 . 0
                </p>
                <p className="font-poppinsBold text-headline-medium font-extrabold text-primary">
                  Headline Medium - 28/36 . 0
                </p>
                <p className="font-poppinsBold text-headline-small font-extrabold text-primary">
                  Headline Small - 24/32 . 0
                </p>
              </div>
            </div>
            <div className="mt-5 p-2 md:p-0 md:pl-5">
              <p className="text-orange-1 font-poppins text-xl font-bold">
                Title
              </p>
              <div className="w-fit space-y-5 rounded-lg border border-primary p-3 md:p-10">
                <p className="font-poppins text-title-large text-primary">
                  Title Large - 22/28 . 0
                </p>
                <p className="font-poppins text-title-medium text-primary">
                  Title Medium - 16/24 . +0.15
                </p>
                <p className="font-poppins text-title-small text-primary">
                  Title Small - 14/20 . +0.1
                </p>
                <p className="font-poppinsBold text-title-large font-extrabold text-primary">
                  Title Large - 22/28 . 0
                </p>
                <p className="font-poppinsBold text-title-medium font-extrabold text-primary">
                  Title Medium - 16/24 . +0.15
                </p>
                <p className="font-poppinsBold text-title-small font-extrabold text-primary">
                  Title Small - 14/20 . +0.1
                </p>
              </div>
            </div>
            <div className="mt-5 p-2 md:p-0 md:pl-5">
              <p className="text-orange-1 font-poppins text-xl font-bold">
                Label
              </p>
              <div className="w-fit space-y-5 rounded-lg border border-primary p-3 md:p-10">
                <p className="font-poppins text-label-large text-primary">
                  Label Large - 14/20 . +0.1
                </p>
                <p className="font-poppins text-label-medium text-primary">
                  Label Medium - 12/16 . +0.5
                </p>
                <p className="font-poppins text-label-small text-primary">
                  Label Small - 11/16 . +0.5
                </p>
                <p className="font-poppinsBold text-label-large font-extrabold text-primary">
                  Label Large - 14/20 . +0.1
                </p>
                <p className="font-poppinsBold text-label-medium font-extrabold text-primary">
                  Label Medium - 12/16 . +0.5
                </p>
                <p className="font-poppinsBold text-label-small font-extrabold text-primary">
                  Label Small - 11/16 . +0.5
                </p>
              </div>
            </div>
            <div className="mt-5 p-2 md:p-0 md:pl-5">
              <p className="text-orange-1 font-poppins text-xl font-bold">
                Body
              </p>
              <div className="w-fit space-y-5 rounded-lg border border-primary p-3 md:p-10">
                <p className="font-poppins text-body-large text-primary">
                  Body Large - 16/24 . +0.15
                </p>
                <p className="font-poppins text-body-medium text-primary">
                  Body Medium - 14/20 . +0.25
                </p>
                <p className="font-poppins text-body-small text-primary">
                  Body Small - 12/16 . +0.4
                </p>
                <p className="font-poppinsBold text-body-large font-extrabold text-primary">
                  Body Large - 16/24 . +0.15
                </p>
                <p className="font-poppinsBold text-body-medium font-extrabold text-primary">
                  Body Medium - 14/20 . +0.25
                </p>
                <p className="font-poppinsBold text-body-small font-extrabold text-primary">
                  Body Small - 12/16 . +0.4
                </p>
              </div>
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">
              Form Example
            </p>
            <div className="mt-5 space-y-3 p-2 md:p-0 md:pl-10">
              <TextField
                className="max-w-sm text-primary"
                placeholder="Placeholder"
                title="TextField"
                subTitle="Wajib diisi!"
                label="Nama"
                name="name"
                required
                rules={{ required: 'Anda harus mengisi ini!' }}
                control={control}
                leftIcon={<Instagram stroke="currentColor" />}
                rightIcon={<Instagram stroke="currentColor" />}
              />
              <TextField
                className="max-w-sm text-primary"
                placeholder="Placeholder"
                title="TextField"
                subTitle="Wajib diisi!"
                label="Email"
                name="email"
                required
                rules={{
                  required: 'Anda harus mengisi ini!',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Alamat email tidak valid!',
                  },
                }}
                control={control}
                leftIcon={<Instagram stroke="currentColor" />}
                rightIcon={<Instagram stroke="currentColor" />}
              />
              <Select
                className="max-w-sm text-primary"
                placeholder="Placeholder"
                title="Select"
                subTitle="Wajib diisi!"
                label="Tahun Ajaran"
                name="yearOfStudy"
                required
                rules={{ required: 'Anda harus mengisi ini!' }}
                control={control}
                select
              >
                <MenuItem key={1} value="2021">
                  2021
                </MenuItem>
                <MenuItem key={2} value="2022">
                  2022
                </MenuItem>
              </Select>
              <Checkbox
                className="text-primary"
                label="Checkbox"
                subLabel="Wajib diisi!"
                options={[{ label: 'Laptop' }, { label: 'PC' }]}
                name="equipments"
                required
                rules={{ required: 'Anda harus mengisi ini!' }}
                control={control}
                setValue={setValue}
              />
              <Radio
                className="text-primary"
                label="Radio"
                subLabel="Wajib diisi!"
                options={[{ label: 'Software Engineer' }, { label: 'UI/UX' }]}
                name="team"
                required
                rules={{ required: 'Anda harus mengisi ini!' }}
                control={control}
                setValue={setValue}
                flexRow
              />
              <DatePicker
                className="max-w-sm text-primary"
                placeholder="Placeholder"
                title="DatePicker"
                subTitle="Wajib diisi!"
                label="Tanggal Lahir"
                name="eventDate"
                required
                rules={{ required: 'Anda harus mengisi ini!' }}
                control={control}
                setValue={setValue}
                minDateTime={dayjs()}
              />
              <div className="pt-5">
                <Button
                  className="w-fit px-5 py-3"
                  variant={1}
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Countdown</p>
            <div className="mt-5 flex w-fit flex-col items-center gap-2 pl-5 md:flex-row md:p-0 md:pl-10">
              <Countdown
                title="Title"
                subTitle="Sub Title"
                date={watch('eventDate')?.toString() ?? ''}
                className="w-[425px]"
              />
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Tabs</p>
            <div className="mt-5 space-y-3 p-2 md:p-0 md:pl-10">
              <Tabs
                value={currentTab}
                setValue={setCurrentTab}
                items={['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6']}
              />
              <Tabs
                dark
                value={currentTab}
                setValue={setCurrentTab}
                items={['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6']}
              />
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Modal</p>
            <div className="mt-5 space-y-3 space-x-4 p-2 md:p-0 md:pl-10">
              <button
                type="button"
                onClick={openModal1}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Modal 1
              </button>
              <button
                type="button"
                onClick={openModal2}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Modal 2
              </button>
              <button
                type="button"
                onClick={openModal3}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Modal 3
              </button>
              <button
                type="button"
                onClick={openModal4}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Modal 4
              </button>
              <Modal
                isOpen={isOpen1}
                onClose={closeModal1}
                onOpen={openModal1}
                title="Modal Variant 1"
                variant={1}
                primaryClicked={closeModal1}
                secondaryClicked={closeModal1}
                primary="Primary"
                secondary="Secondary"
                message="A dialog is a type of modal window that appears in front
              of app content to provide critical information, or prompt
              for a decision to be made."
                icon={<Modalcheckicon />}
              />
              <Modal
                isOpen={isOpen2}
                onClose={closeModal2}
                onOpen={openModal2}
                title="Modal Variant 2"
                variant={2}
                primaryClicked={closeModal2}
                secondaryClicked={closeModal2}
                primary="Primary"
                secondary="Secondary"
                message="A dialog is a type of modal window that appears in front
              of app content to provide critical information, or prompt
              for a decision to be made."
                icon={<Modalcheckicon />}
              />
              <Modal
                isOpen={isOpen3}
                onClose={closeModal3}
                onOpen={openModal3}
                title="Modal Variant 3"
                variant={3}
                primaryClicked={closeModal3}
                secondaryClicked={closeModal3}
                primary="Primary"
                secondary="Secondary"
                message="A dialog is a type of modal window that appears in front
              of app content to provide critical information, or prompt
              for a decision to be made."
                icon={<Modalcheckicon />}
              />
              <Modal
                isOpen={isOpen4}
                onClose={closeModal4}
                onOpen={openModal4}
                title="Unclosed Modal"
                variant={1}
                canClose={false}
                primary="Primary"
                secondary="Secondary"
                message="A dialog is a type of modal window that appears in front
              of app content to provide critical information, or prompt
              for a decision to be made."
                icon={<Modalcheckicon />}
              />
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Toggle</p>
            <div className="mt-5 space-y-3 p-2 md:p-0 md:pl-10">
              <Toggle enabled={enabledToggle} setEnabled={setEnabledToggle} />
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Chips</p>
            <div className="mt-5 space-y-3 p-2 md:p-0 md:pl-10">
              <div className="space-y-2 md:flex md:gap-2 md:space-y-0">
                <Chips
                  onClick={handleChipsClick}
                  enabled={isChipsEnabled}
                  leftIcon={<Instagram />}
                  text="With icon"
                  variant={1}
                />
                <Chips rightIcon={<Instagram />} text="With icon" variant={1} />
                <Chips text="Without icon" variant={1} />
              </div>
              <div className="space-y-2 md:flex md:gap-2 md:space-y-0">
                <Chips
                  onClick={handleChipsClick2}
                  enabled={isChipsEnabled2}
                  leftIcon={<Instagram />}
                  text="With icon"
                  variant={2}
                />
                <Chips rightIcon={<Instagram />} text="With icon" variant={2} />
                <Chips text="Without icon" variant={2} />
              </div>
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Tag</p>
            <div className="mt-5 space-y-3 p-2 md:p-0 md:pl-10">
              <div className="space-y-2 md:flex md:gap-2 md:space-y-0">
                <Tag
                  text="TAG"
                  variant={1}
                  className="flex items-center"
                  flex
                />
                <Tag text="TAG" icon={<Instagram />} variant={1} flex />
              </div>
              <div className="space-y-2 md:flex md:gap-2 md:space-y-0">
                <Tag
                  text="TAG"
                  variant={2}
                  className="flex items-center"
                  flex
                />
                <Tag text="TAG" icon={<Instagram />} variant={2} flex />
              </div>
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Tip Card</p>
            <div className="mt-5 space-y-3 p-2 md:p-0 md:pl-10">
              <TipCard
                message="Pastikan file GDrive telah kamu public."
                icon={<ExclamationTriangleIcon className="h-7 w-7" />}
                variant="red"
              />
              <TipCard
                message="Pastikan file GDrive telah kamu public."
                icon={<ExclamationTriangleIcon className="h-7 w-7" />}
                variant="green"
              />
              <TipCard
                message="Pastikan file GDrive telah kamu public."
                icon={<ExclamationTriangleIcon className="h-7 w-7" />}
                variant="orange"
              />
              <TipCard
                message="Pastikan file GDrive telah kamu public."
                icon={<ExclamationTriangleIcon className="h-7 w-7" />}
                variant="purple"
              />
              <TipCard
                message="Pastikan file GDrive telah kamu public."
                icon={<ExclamationTriangleIcon className="h-7 w-7" />}
                variant="blue"
              />
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Button</p>
            <div className="mt-5 flex w-fit flex-col items-center gap-2 pl-5 md:flex-row md:p-0 md:pl-10">
              <Button
                className="w-fit px-3 py-2"
                variant={1}
                onClick={handleClick}
              >
                Button
              </Button>
              <Button
                className="w-fit px-3 py-2"
                variant={1}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
              >
                Button
              </Button>

              <Button
                className="w-fit px-5 py-3"
                variant={1}
                onClick={handleClick}
              >
                Button
              </Button>
              <Button
                className="w-fit px-5 py-3"
                variant={1}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
              >
                Button
              </Button>
              <Button
                className="w-fit px-5 py-3"
                variant={1}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
                disabled
              >
                Button
              </Button>
              <Button
                className="w-fit p-2"
                variant={1}
                onClick={handleClick}
                leftIcon={<Instagram size="w-7 h-7" />}
              ></Button>
              <Button
                className="w-fit px-5 py-3"
                variant={1}
                onClick={handleClick}
                isLoading
              >
                Button
              </Button>
            </div>
            <div className="mt-5 flex w-fit flex-col items-center gap-2 pl-5 md:flex-row md:p-0 md:pl-10">
              <Button
                className="w-fit px-3 py-2"
                variant={2}
                onClick={handleClick}
              >
                Button
              </Button>
              <Button
                className="w-fit px-3 py-2"
                variant={2}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
              >
                Button
              </Button>

              <Button
                className="w-fit px-5 py-3"
                variant={2}
                onClick={handleClick}
              >
                Button
              </Button>
              <Button
                className="w-fit px-5 py-3"
                variant={2}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
              >
                Button
              </Button>
              <Button
                className="w-fit px-5 py-3"
                variant={2}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
                disabled
              >
                Button
              </Button>
              <Button
                className="w-fit p-2"
                variant={2}
                onClick={handleClick}
                leftIcon={<Instagram size="w-7 h-7" />}
              ></Button>
              <Button
                className="w-fit px-5 py-3"
                variant={2}
                onClick={handleClick}
                isLoading
              >
                Button
              </Button>
            </div>
            <div className="mt-5 flex w-fit flex-col items-center gap-2 pl-5 md:flex-row md:p-0 md:pl-10">
              <Button
                className="w-fit px-3 py-2"
                variant={3}
                onClick={handleClick}
              >
                Button
              </Button>
              <Button
                className="w-fit px-3 py-2"
                variant={3}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
              >
                Button
              </Button>

              <Button
                className="w-fit px-5 py-3"
                variant={3}
                onClick={handleClick}
              >
                Button
              </Button>
              <Button
                className="w-fit px-5 py-3"
                variant={3}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
              >
                Button
              </Button>
              <Button
                className="w-fit px-5 py-3"
                variant={3}
                onClick={handleClick}
                leftIcon={<Instagram size="w-4 h-4" />}
                rightIcon={<Instagram size="w-4 h-4" />}
                disabled
              >
                Button
              </Button>
              <Button
                className="w-fit p-2"
                variant={3}
                onClick={handleClick}
                leftIcon={<Instagram size="w-7 h-7" />}
              ></Button>
              <Button
                className="w-fit px-5 py-3"
                variant={3}
                onClick={handleClick}
                isLoading
              >
                Button
              </Button>
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">
              Toast wihout Description
            </p>
            <div className="mt-5 flex w-fit flex-col items-center gap-2 pl-5 md:flex-row md:p-0 md:pl-10">
              <button
                type="button"
                onClick={() => {
                  toast.loading('Loading')
                }}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Toast Loading
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success('Success')
                  // Toast({ type: 'success', message: 'Success', description: 'Description' })
                }}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Toast Success
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.error('Error')
                }}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Toast Error
              </button>
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">
              Toast with Description
            </p>
            <div className="mt-5 flex w-fit flex-col items-center gap-2 pl-5 md:flex-row md:p-0 md:pl-10">
              <button
                type="button"
                onClick={() => {
                  Toast({
                    type: 'success',
                    message: 'Success',
                    description: 'Description',
                  })
                }}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Toast Success
              </button>
              <button
                type="button"
                onClick={() => {
                  Toast({
                    type: 'error',
                    message: 'Error',
                    description: 'Description',
                  })
                }}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Toast Error
              </button>
            </div>
          </div>
          <div className="md:pl-5">
            <p className="pl-2 font-retro text-6xl text-primary">Calendly</p>
            <div className="mt-5 flex w-fit flex-col items-center gap-2 pl-5 md:flex-row md:p-0 md:pl-10">
              <button
                type="button"
                onClick={openCalendly}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open Modal Calendly
              </button>
              <Calendly
                url="https://calendly.com/iyoubee/test-embeded-calendly"
                isOpen={isOpenCalendly}
                onClose={closeCalendly}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Artex
