import React from 'react'
import styled, { css } from 'styled-components'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const StyledModal = styled(Modal)`
  ${({ theme: { colors, fontSize } }) => css`
    & {
      position: relative;
      & > div:first-child {
        background-color: rgb(31, 51, 111, 0.4) !important;
      }

      .modal__content {
        max-height: 90%;
        overflow-y: scroll;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 40px 80px;
        outline: none;
        border-radius: 10px;

        .modal__close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
        }
      }
    }
  `}
`

export default function({ open, onClose, children, width }) {
  return (
    <StyledModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      // onClose={onClose}
      width={width}
    >
      <div className="modal__content">
        <IconButton
          className="modal__close-btn"
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        {children}
      </div>
    </StyledModal>
  )
}
