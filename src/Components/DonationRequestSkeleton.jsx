import React from "react";

const DonationRequestSkeleton = () => {
    return (
        <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-base-300 animate-pulse">
            {/* Card Header Skeleton */}
            <div className="bg-gray-300 h-24 p-6 relative">
                <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-24 bg-gray-400 rounded"></div>
                    <div className="h-6 w-16 bg-gray-400 rounded-full"></div>
                </div>
                <div className="h-6 w-3/4 bg-gray-400 rounded mt-2"></div>
            </div>

            {/* Card Body Skeleton */}
            <div className="p-6 space-y-4">
                {/* Address Skeleton */}
                <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gray-300 rounded-full shrink-0"></div>
                    <div className="w-full">
                        <div className="h-3 w-16 bg-gray-300 rounded mb-1"></div>
                        <div className="h-4 w-full bg-gray-300 rounded"></div>
                    </div>
                </div>

                {/* Date & Time Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <div>
                            <div className="h-3 w-10 bg-gray-300 rounded mb-1"></div>
                            <div className="h-4 w-20 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <div>
                            <div className="h-3 w-10 bg-gray-300 rounded mb-1"></div>
                            <div className="h-4 w-20 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Status Badge Skeleton */}
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
            </div>

            {/* Card Footer Skeleton */}
            <div className="px-6 pb-6">
                <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
            </div>
        </div>
    );
};

export default DonationRequestSkeleton;
