import React, { useState } from 'react'

// Modalbox allowing email to be sent from gmail or copied to clipboard
function ModalDialog(props: any) {
  // UseState hook to allow opened and closed box states
  const [isOpen, setIsOpen] = useState(false)

  // Function to open the box
  const handleOpen = () => {
    setIsOpen(true)
  }

  // Function to close the box
  const handleClose = () => {
    setIsOpen(false)
  }

  // Copies email passed from the calling component to clipboard
  function clipboard() {
    const copyText = props.email
    navigator.clipboard.writeText(copyText)
  }

  return (
    <div>
      <button onClick={handleOpen}>{props.element}</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Follow these links to learn more about English verbs and conjugation:</p>
            <a href="https://www.worddy.co/en/list-of-irregular-verbs-english" target="_blank">Irregular verbs table</a>
            <a href="https://grammar.yourdictionary.com/parts-of-speech/verbs/rules-for-conjugating-verbs.html" target="_blank">Basics of conjugation</a>
            <p className="close" onClick={handleClose}>
              Close
            </p>
            </div>
          </div>
      )}
    </div>
  )
}

export default ModalDialog
