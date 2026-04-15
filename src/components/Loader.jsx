export default function Loader({ message = 'Loading...', fullPage = false }) {
  return (
    <div className={fullPage ? 'loader-screen' : 'loader-inline'}>
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}
