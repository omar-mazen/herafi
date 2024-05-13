export default function FormTextArea({ label = "", error, register, max }) {
  return (
    <div>
      <div className={`relative`}>
        <textarea
          maxLength={max}
          placeholder={label}
          className={`focus:outline-primary-color" h-72 w-full resize-none overflow-y-auto rounded-lg border border-text-color/50 bg-primary-background px-6 py-4 focus:outline focus:outline-1 focus:outline-primary-color `}
          {...register}
        />
      </div>
      {error && (
        <p className=" mt-2 text-small text-warning-color">{error.message}</p>
      )}
    </div>
  );
}
