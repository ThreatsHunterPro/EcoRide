import Button from "./Button";

export default function NavigationButtons({
  isFirst,
  hasFinished,
  onPrev,
  onNext,
  disabledNext = false
}) {
  const handleNextClick = () => {
      if (!disabledNext) onNext();
  };

  return (
    <div className="flex items-center">
      {!isFirst ? (
        <Button
          type="button"
          onClick={onPrev}
          label="← Retour"
          variant="text"
          className="w-20"
        />
      ) : (
        <span />
      )}

      <div className="flex-grow">
        {hasFinished ? (
          <Button
            type="submit"
            label="S’inscrire"
            fullWidth
            centered
          />
        ) : (
          <Button
            type="button"
            label="Suivant"
            onClick={handleNextClick}
            fullWidth
            centered
          />
        )}
      </div>
    </div>
  );
}