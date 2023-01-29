export function MsgPreview({contact}){
    return  (
    <div className="msg-preview">
    <div className="msg-avatar">
      <img src={contact.imgUrl} alt={'avatar'} className="mini-user-img" />
    </div>
    <div className="msg-name">{contact.fullname}</div>
    {/* <div className="msg-txt">{msgs[msgs.length - 1]?.txt}</div> */}
    <div className="msg-txt">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem fugiat inventore nam, necessitatibus iure fugit unde eos esse quam repudiandae amet ipsam expedita reprehenderit ab quasi tempore id nesciunt magnam?</div>
  </div>
    )}