import axios from "axios";
import { useAuth, useUser } from "@clerk/react";
import { Button } from "./button";
import { Sidebar } from "./sidebar";
import { Card } from "./card";
import { PlusIcon } from "../icons/plus";
import { ShareIcon } from "../icons/shareIcon";
import { CreateModal } from "../components/createModal";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config";

export const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();

  const getData = useCallback(async () => {
    try {
      const token = await getToken();
      const posts = await axios.get(`${API_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(posts);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [getToken]);

  useEffect(() => {
    getData();
  }, [getData]);

  const createNote = async (data: any) => {
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/notes/create-note`, {
        title: data.title,
        content: data.link
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getData();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const SyncUser = async () => {
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/user/sync`, {
        username: user?.username || user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || "User",
        email: user?.emailAddresses[0]?.emailAddress,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error syncing user:", error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          console.log(data);
          createNote(data);
          SyncUser();
          setModalOpen(false);
        }}
      />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All Notes</h2>
          <div className="flex gap-3">
            <Button
              varient="secondary"
              size="md"
              text="Share Brain"
              startIcon={<ShareIcon size="sm" />}
              onClick={() => alert("Share Brain clicked")}
            />
            <Button
              varient="primary"
              size="md"
              text="Add Content"
              startIcon={<PlusIcon size="sm" />}
              onClick={() => setModalOpen(true)}
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card
            title="Sample Tweet"
            type="tweet"
            content="https://twitter.com/vibingmonk/status/2032893470067798524"
            tags={["inspiration", "tweet"]}
            addedDate="15/03/2024"
          />
          <Card
            title="Sample youtube video"
            type="video"
            content="https://www.youtube.com/watch?v=2uoU7mXAXHo"
            tags={["inspiration", "video"]}
            addedDate="15/03/2024"
            />
        </div>
      </div>
    </div>
  );
};
