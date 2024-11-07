import { Badge, Flex } from "antd";
import { queryClient } from "@Api/Client";
import MessageIcon from "@Assets/icons/messages.svg";
import ProfileDropdown from "@Components/ProfileDropdown/ProdileDropdown";
import useAuthStore from "@Store/authStore";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import NotificationsDropdown from "@Layout/AuthLayout/NotificationsDropdown/NotificationsDropdown";

const AppHeader = ({ chatUnreadMessagesCount }: { chatUnreadMessagesCount: number }) => {
    const { removeUserAuthentication } = useAuthStore();

    const navigate = useNavigate();
    const handleLogout = () => {
        queryClient.clear();
        removeUserAuthentication();
    };
    return (
        <Flex align="center" gap={12} className="mr-8 ">
            <NotificationsDropdown />
            <div className="relative">
                <MessageIcon
                    onClick={() => {
                        navigate(NavigationRoutes.DASHBOARD_ROUTES.CHAT);
                    }}
                    className="cursor-pointer align-middle w-[29px] h-[29px]"
                />
                {typeof chatUnreadMessagesCount === "number" && chatUnreadMessagesCount ? (
                    <Badge
                        count={chatUnreadMessagesCount}
                        color="#F38001"
                        className="absolute top-[11px] right-px"
                        size="small"
                        overflowCount={10}
                    />
                ) : null}
            </div>
            <ProfileDropdown logout={handleLogout} />
        </Flex>
    );
};

export default AppHeader;
