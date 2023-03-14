export interface TeamDetailProps {
  refetchGameData: () => void
  game: {
    name: string | null
    lineGroup: string | null
  } | null
  Team: {
    teamStatus: {
      name: string | null
      message: string | null
    } | null
    id: string
    name: string | null
    leader: {
      userId: string | null
    } | null
    logo: string | null
    leaderId: string | null
    isTeamButIndividual: boolean | null
  } | null
}

export interface RemoveModalProps {
  isOpen: boolean
  participantId: string
  participantIgn: string
  participantName: string
}

export interface EditingModeProps {
  isEditingMode: boolean
  participantId: string
}

export interface updateIgnType {
  ign: string
}
