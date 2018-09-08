const actions = {
  OPEN_DIALOG: 'OPEN_DIALOG',
  LOAD_FILES: 'LOAD_FILES',
  openDialog: (payload) => ({
    type: actions.OPEN_DIALOG,
    payload
  })
}
export default actions
