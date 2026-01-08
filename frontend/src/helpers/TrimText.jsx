
const TrimText = ({ text, maxlength }) => {
if (!text) return null
  
  return (
    <>
      {text.length > maxlength ? (
        <>
          {text.substring(0, maxlength)} <strong>...</strong>
        </>
      ) : (
        text
      )}
    </>
  )
}

export default TrimText