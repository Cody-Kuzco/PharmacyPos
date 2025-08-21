import { fetchProducts } from "@/app/api/fetchProduct/route";
import Link from "next/link";
import React from "react";
import { FaEdit, FaUser, FaUsers, FaUserShield } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import DeleteUser from "./DeleteUser";
import { BsCart4 } from "react-icons/bs";

const Users = ({ users }) => {
  // Calculate user statistics
  const totalUsers = users.length;
  const userCounts = users.reduce((counts, user) => {
    if (user.userType === 'Admin') {
      counts.admins += 1;
    } else if (user.userType === 'User') {
      counts.users += 1;
    }
    return counts;
  }, { admins: 0, users: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaUsers className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Manage all system users and their permissions
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <FaUsers className="text-2xl text-white" />
              </div>
              <div className="text-right">
                <p className="text-blue-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
              </div>
            </div>
          </div>

          {/* Admin Users */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <FaUserShield className="text-2xl text-white" />
              </div>
              <div className="text-right">
                <p className="text-purple-600 text-sm font-medium">Admin Users</p>
                <p className="text-3xl font-bold text-gray-800">{userCounts.admins}</p>
              </div>
            </div>
          </div>

          {/* Sales Users */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <FaUser className="text-2xl text-white" />
              </div>
              <div className="text-right">
                <p className="text-green-600 text-sm font-medium">Sales Users</p>
                <p className="text-3xl font-bold text-gray-800">{userCounts.users}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b border-gray-200/50">
            <h2 className="text-xl font-bold text-gray-800">All Users</h2>
            <p className="text-gray-600 text-sm mt-1">Manage user accounts and permissions</p>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden">
            <div className="p-4 space-y-4">
              {users.map((user, index) => (
                <div key={user._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-bold text-white mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">{user.username}</h3>
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white mt-1">
                            {user.userType}
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        {user.userType === 'Admin' ? (
                          <FaUserShield className="text-white text-lg" />
                        ) : (
                          <FaUser className="text-white text-lg" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="text-sm font-medium text-gray-800">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="text-sm font-medium text-gray-800">{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Bio</p>
                        <p className="text-sm font-medium text-gray-800">{user.bio}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center space-x-3 pt-3 border-t border-gray-100">
                      <Link href={`/dashboard/editProfile/${user?._id}`}>
                        <div className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-all duration-200">
                          <FaEdit className="text-sm" />
                        </div>
                      </Link>
                      <DeleteUser id={user._id.toString()} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">S/N</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">User Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Username</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Bio</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 border-l-4 border-transparent hover:border-blue-400"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700 group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-700 transition-all duration-200">
                          {index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        user.userType === 'Admin' 
                          ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-200">
                          {user.userType === 'Admin' ? (
                            <FaUserShield className="text-indigo-600 text-sm" />
                          ) : (
                            <FaUser className="text-indigo-600 text-sm" />
                          )}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">
                          {user.username}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">{user.bio}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link href={`/dashboard/editProfile/${user?._id}`}>
                          <div className="group/btn relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg">
                            <FaEdit className="text-sm relative z-10" />
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 origin-left"></div>
                          </div>
                        </Link>
                        <DeleteUser id={user._id.toString()} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
              <p className="text-gray-500 max-w-md mx-auto text-sm px-4">
                There are no users registered in the system yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
