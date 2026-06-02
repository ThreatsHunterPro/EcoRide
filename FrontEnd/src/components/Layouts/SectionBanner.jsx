import SeeMore from '../Shared/SeeMore';

export default function SectionBanner({ title, moreLink }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <div className="text-center sm:text-left w-full sm:w-auto">
        <h2 className="text-3xl font-bold leading-tight inline-block">
          {title}
        </h2>
        <hr className="border-t-2 border-blue-600 w-24 mt-2 mx-auto sm:mx-0" />
      </div>

      <SeeMore moreLink={moreLink} />
    </div>
  );
}