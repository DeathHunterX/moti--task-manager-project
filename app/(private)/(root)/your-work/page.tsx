import YourWorkClient from "./client";

const YourWorkPage = () => {
    return (
        <div className="mt-6 px-10">
            <div className="border-b border-b-gray-300">
                <h1 className="mb-1.5 text-2xl text-[#172B4D]">Your work</h1>
            </div>
            <YourWorkClient />
        </div>
    );
};

export default YourWorkPage;
