type ErrorMessagesProps = {
  errorTerms: string[];
  errorState: any;
  className?: string;
  textColor?: string;
  textClass?: string;
};

export default function ErrorMessages({
  errorTerms,
  errorState,
  className,
  textClass,
  textColor,
}: ErrorMessagesProps) {
  let errorMessages;

  if (typeof errorState.message !== 'object') {
    errorMessages = errorState.message.split('\n');
  } else {
    errorMessages = Object.entries(errorState.message).map(
      ([_key, value]) => value,
    );
  }

  return (
    <>
      {errorMessages.length === 1 &&
      errorTerms.includes(errorMessages[0] as string) ? (
        <span
          className={`${
            textColor ? textColor : 'text-red-500'
          } ${textClass} ml-4 font-raleway`}
        >
          {errorState.message}
        </span>
      ) : (
        <div className={`${className}`}>
          {errorMessages.map((msg: any) =>
            errorTerms.map((err) =>
              msg.includes(err) ? (
                <span
                  key={msg}
                  className={`${
                    textColor ? textColor : 'text-red-500'
                  } ${textClass} font-raleway`}
                >
                  {msg}
                </span>
              ) : null,
            ),
          )}
        </div>
      )}
    </>
  );
}
