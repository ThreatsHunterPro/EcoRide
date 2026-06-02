// import { useNavigate } from 'react-router-dom';
// import { useSearch } from '../../../hooks/search/useSearch';
// import FormInput from "../FormInput";
// import VerticalBar from "./VerticalBar";
// import Button from "../Button";

// export default function SearchBar() {
//   const navigate = useNavigate();
//   const { jobTitle, setJobTitle, location, setLocation } = useSearch();

//   const handleClick = () => {
//     const jobTitleURI = encodeURIComponent(jobTitle);
//     const locationURI = encodeURIComponent(location);
//     navigate(
//       `/offers?jobTitle=${jobTitleURI}&location=${locationURI}`
//     );
//   };

//   return (
//     <div className="w-full max-w-[720px] mx-auto mt-16 px-4">
//       <div className="p-1 bg-white rounded-[2rem] shadow-lg">
//         <div className="flex items-center border border-white rounded-[2rem] overflow-hidden h-12 bg-white relative">
//           <FormInput
//             type="search"
//             name="jobTitle"
//             placeholder="Quoi ?"
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             noFocusOutline={true}
//             noInputBorder={true}
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
//                 />
//               </svg>
//             }
//             className="flex-grow"
//           />

//           <VerticalBar />

//           <FormInput
//             type="search"
//             name="location"
//             placeholder="Où ?"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             noFocusOutline={true}
//             noInputBorder={true}
//             icon={
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418-5.016-6-7.485-6-10a6 6 0 1112 0c0 2.515-1.582 4.984-6 10z"
//                 />
//               </svg>
//             }
//             className="flex-grow-2"
//           />

//         <Button 
//           label="Rechercher"
//           onClick={handleClick}
//         />
//         </div>
//       </div>
//     </div>
//   );
// }