import { Flex } from "antd";
import { queryClient } from "@Api/Client";
import useAuthStore from "@Store/authStore";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "@Components/ProfileDropdown/ProdileDropdown";
import { API_CONFIG_URLS } from "@Constants/config";
import ApiService from "@Services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

const AppHeader = ({ chatUnreadMessagesCount }: { chatUnreadMessagesCount: number }) => {
    const { removeUserAuthentication } = useAuthStore();
    const navigate = useNavigate();

    const { mutate: logoutUser, isLoading: isLoggingOut } = useMutation(
        async () => {
            const response = await ApiService.post(`${API_CONFIG_URLS.ADMIN.LOGOUT}`);
            if (!response.ok) throw new Error("Logout failed");
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.clear();
                removeUserAuthentication();
                navigate(NavigationRoutes.AUTH_ROUTES.LOGIN);
            },
            onError: (error) => {
                console.error("Logout Error:", error);
            }
        }
    );

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <Flex align="center" gap={12} className="mr-8 ">
            <ProfileDropdown logout={handleLogout} />
        </Flex>
    );
};

export default AppHeader;