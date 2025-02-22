
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { User } from "@/types/auth";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <Card className="max-w-6xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">
            Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] rounded-md border border-gray-700 p-4">
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-4 rounded-lg bg-gray-700/50 border border-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-100">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/user/${user.id}/boards`)}
                        className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
                      >
                        View Boards
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
