import { useStore } from '@/store/useStore';

// SVG Icons
const ScienceIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 3v2m6-2v2M9 19v-2m6 2v-2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const BusinessIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="7" width="18" height="13" rx="2"/>
    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
    <path d="M12 12v4m-4-2h8"/>
  </svg>
);

const ArtsIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function DepartmentSelector() {
  const setSelectedDepartment = useStore((state) => state.setSelectedDepartment);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Department</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => setSelectedDepartment('science')}
          className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition text-center"
        >
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <ScienceIcon />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Science</h3>
          <p className="text-gray-600 text-sm">
            Physics, Chemistry, Biology, Mathematics
          </p>
        </button>

        <button
          onClick={() => setSelectedDepartment('commercial')}
          className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition text-center"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-700">
            <BusinessIcon />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Commercial</h3>
          <p className="text-gray-600 text-sm">
            Accounting, Economics, Commerce
          </p>
        </button>

        <button
          onClick={() => setSelectedDepartment('arts')}
          className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition text-center"
        >
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
            <ArtsIcon />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Arts</h3>
          <p className="text-gray-600 text-sm">
            Literature, Government, History, CRS/IRS
          </p>
        </button>
      </div>
    </div>
  );
}