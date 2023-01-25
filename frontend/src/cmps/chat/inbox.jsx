import { InputTextRounded } from '../ui/input/input-text-rounded'

export function Inbox() {
  return (
    <section className='inbox-container main-layout'>
      <div className='contacts inbox-column'>
        <div className='inbox-column-header '>
          <h1>Messages</h1>
        </div>
      </div>
      <div className='chat  inbox-column'>
        <div className='inbox-column-header '>
          <h2></h2>
        </div>
        <div className='chat-msgs'>messages</div>

        <div className='chat-input'>
          <InputTextRounded />
        </div>
      </div>
      <div className='stay-info inbox-column'>
        <div className='inbox-column-header '>
          <h2>Details</h2>
        </div>
      </div>
    </section>
  )
}
