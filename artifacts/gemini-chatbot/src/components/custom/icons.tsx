export const BotIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.75 2.79933C9.19835 2.53997 9.5 2.05521 9.5 1.5C9.5 0.671573 8.82843 0 8 0C7.17157 0 6.5 0.671573 6.5 1.5C6.5 2.05521 6.80165 2.53997 7.25 2.79933V5H7C4.027 5 1.55904 7.16229 1.08296 10H0V13H1V14.5V16H2.5H13.5H15V14.5V13H16V10H14.917C14.441 7.16229 11.973 5 9 5H8.75V2.79933ZM7 6.5C4.51472 6.5 2.5 8.51472 2.5 11V14.5H13.5V11C13.5 8.51472 11.4853 6.5 9 6.5H7ZM7.25 11.25C7.25 12.2165 6.4665 13 5.5 13C4.5335 13 3.75 12.2165 3.75 11.25C3.75 10.2835 4.5335 9.5 5.5 9.5C6.4665 9.5 7.25 10.2835 7.25 11.25ZM10.5 13C11.4665 13 12.25 12.2165 12.25 11.25C12.25 10.2835 11.4665 9.5 10.5 9.5C9.5335 9.5 8.75 10.2835 8.75 11.25C8.75 12.2165 9.5335 13 10.5 13Z" fill="currentColor" />
  </svg>
);

export const UserIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z" fill="currentColor" />
  </svg>
);

export const ArrowUpIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z" fill="currentColor" />
  </svg>
);

export const StopIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path d="M3 3h10v10H3z" fill="currentColor" />
  </svg>
);

export const PaperclipIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 6.5V13.5C14.5 14.8807 13.3807 16 12 16H4C2.61929 16 1.5 14.8807 1.5 13.5V1.5V0H3H8H9.08579C9.351 0 9.60536 0.105357 9.79289 0.292893L14.2071 4.70711C14.3946 4.89464 14.5 5.149 14.5 5.41421V6.5ZM13 6.5V13.5C13 14.0523 12.5523 14.5 12 14.5H4C3.44772 14.5 3 14.0523 3 13.5V1.5H8V5V6.5H9.5H13ZM9.5 2.12132V5H12.3787L9.5 2.12132Z" fill="currentColor" />
  </svg>
);

export const LoaderIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
    <path d="M13.9542 8.89615C13.9542 9.1997 13.7115 9.44615 13.4042 9.44615C13.1 9.44615 12.8542 9.1997 12.8542 8.89615C12.8542 7.9808 12.5702 7.08725 12.0382 6.33371C11.5063 5.58017 10.7519 5.00256 9.87657 4.67641C9.00126 4.35027 8.04792 4.29112 7.13977 4.50689C6.23162 4.72267 5.41102 5.20298 4.78597 5.88441C4.16093 6.56584 3.76099 7.41569 3.64011 8.32525C3.51923 9.23481 3.68324 10.1601 4.10994 10.9726C4.53664 11.785 5.20671 12.4449 6.02647 12.8675C6.84622 13.2901 7.77484 13.4544 8.68978 13.3387L8.82025 14.4298C7.70447 14.5713 6.57124 14.3741 5.56872 13.863C4.5662 13.352 3.7393 12.5491 3.19412 11.5608C2.64895 10.5724 2.40988 9.44491 2.50757 8.32076C2.60527 7.19661 3.03551 6.12696 3.74376 5.24779C4.45201 4.36861 5.40749 3.71881 6.48901 3.38158C7.57053 3.04434 8.72809 3.03476 9.81502 3.35395C10.9019 3.67314 11.8685 4.30686 12.5913 5.17484C13.3141 6.04282 13.7608 7.10526 13.8742 8.22782C13.9278 8.44888 13.9542 8.67241 13.9542 8.89615Z" fill="currentColor" />
  </svg>
);

export const MenuIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M1 2.75C1 2.33579 1.33579 2 1.75 2H14.25C14.6642 2 15 2.33579 15 2.75C15 3.16421 14.6642 3.5 14.25 3.5H1.75C1.33579 3.5 1 3.16421 1 2.75ZM1 8C1 7.58579 1.33579 7.25 1.75 7.25H14.25C14.6642 7.25 15 7.58579 15 8C15 8.41421 14.6642 8.75 14.25 8.75H1.75C1.33579 8.75 1 8.41421 1 8ZM1.75 12.5C1.33579 12.5 1 12.8358 1 13.25C1 13.6642 1.33579 14 1.75 14H14.25C14.6642 14 15 13.6642 15 13.25C15 12.8358 14.6642 12.5 14.25 12.5H1.75Z" fill="currentColor" />
  </svg>
);

export const PencilEditIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 1.70711C11.3166 1.31658 10.6834 1.31658 10.2929 1.70711L2 9.99999V12H4L12.2929 3.70711C12.6834 3.31658 12.6834 2.68342 12.2929 2.29289L11.7071 1.70711ZM13.5 13.5H2.5H1V15H2.5H13.5H15V13.5H13.5Z" fill="currentColor" />
  </svg>
);

export const TrashIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path clipRule="evenodd" d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6548C13.0774 14.9805 11.9625 16 10.6327 16H5.36727C4.03748 16 2.92261 14.9805 2.82244 13.6548L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5617C4.36837 14.2 4.90252 14.5 5.36727 14.5H10.6327C11.0975 14.5 11.6316 14.2 11.682 13.5617L12.3776 4.5H3.62244L4.31802 13.5617Z" fill="currentColor" fillRule="evenodd" />
  </svg>
);

export const MoreHorizontalIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
    <path d="M5 8C5 8.82843 4.32843 9.5 3.5 9.5C2.67157 9.5 2 8.82843 2 8C2 7.17157 2.67157 6.5 3.5 6.5C4.32843 6.5 5 7.17157 5 8ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM12.5 9.5C13.3284 9.5 14 8.82843 14 8C14 7.17157 13.3284 6.5 12.5 6.5C11.6716 6.5 11 7.17157 11 8C11 8.82843 11.6716 9.5 12.5 9.5Z" fill="currentColor" />
  </svg>
);

export const InfoIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8 6.5C8.41421 6.5 8.75 6.83579 8.75 7.25V11.25C8.75 11.6642 8.41421 12 8 12C7.58579 12 7.25 11.6642 7.25 11.25V7.25C7.25 6.83579 7.58579 6.5 8 6.5ZM8 5.5C8.55228 5.5 9 5.05228 9 4.5C9 3.94772 8.55228 3.5 8 3.5C7.44772 3.5 7 3.94772 7 4.5C7 5.05228 7.44772 5.5 8 5.5Z" fill="currentColor" />
  </svg>
);

export const SlashIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path d="M5 14L11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const VercelIcon = ({ size = 17 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1L16 15H0L8 1Z" fill="currentColor" />
  </svg>
);

export const MessageIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 1H13.5C14.3284 1 15 1.67157 15 2.5V10.5C15 11.3284 14.3284 12 13.5 12H8.61803L5.44721 14.5528C5.17317 14.7628 4.80623 14.7924 4.50265 14.6229C4.19907 14.4534 4 14.1161 4 13.75V12H2.5C1.67157 12 1 11.3284 1 10.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2.5V10.5H5.5V12.8944L8.05279 11H13.5V2.5H2.5Z" fill="currentColor" />
  </svg>
);

export const LogoGoogle = () => (
  <svg height="16" viewBox="0 0 16 16" width="16">
    <path d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z" fill="#4285F4" />
    <path d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98182 12.5309 9.07273 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z" fill="#34A853" />
    <path d="M3.52 9.52727C3.36 9.04727 3.26909 8.53818 3.26909 8C3.26909 7.46182 3.36 6.95273 3.52 6.47273V4.40727H0.858182C0.312727 5.49091 0 6.70909 0 8C0 9.29091 0.312727 10.5091 0.858182 11.5927L3.52 9.52727Z" fill="#FBBC05" />
    <path d="M8 3.17818C9.17818 3.17818 10.2327 3.58545 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.1527 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.40727L3.52 6.47273C4.15273 4.58182 5.92 3.17818 8 3.17818Z" fill="#EA4335" />
  </svg>
);

export const CheckCircle = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM11.7803 6.03033L12.3107 5.5L11.25 4.43934L10.7197 4.96967L7 8.68934L5.28033 6.96967L4.75 6.43934L3.68934 7.5L4.21967 8.03033L6.46967 10.2803C6.76256 10.5732 7.23744 10.5732 7.53033 10.2803L11.7803 6.03033Z" fill="currentColor" />
  </svg>
);

export const ArrowUpRightSmallIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.75 3.75H3.75C3.19772 3.75 2.75 4.19772 2.75 4.75V12.25C2.75 12.8023 3.19772 13.25 3.75 13.25H11.25C11.8023 13.25 12.25 12.8023 12.25 12.25V9.25H13.75V12.25C13.75 13.6307 12.6307 14.75 11.25 14.75H3.75C2.36929 14.75 1.25 13.6307 1.25 12.25V4.75C1.25 3.36929 2.36929 2.25 3.75 2.25H6.75V3.75ZM9.25 2.25H13.75V6.75H12.25V4.81066L7.28033 9.78033L6.21967 8.71967L11.1893 3.75H9.25V2.25Z" fill="currentColor" />
  </svg>
);

export const PlusIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.75 1.75V1H7.25V1.75V7.25H1.75H1V8.75H1.75H7.25V14.25V15H8.75V14.25V8.75H14.25H15V7.25H14.25H8.75V1.75Z" fill="currentColor" />
  </svg>
);

export const ClockIcon = ({ size = 16 }: { size?: number }) => (
  <svg height={size} strokeLinejoin="round" viewBox="0 0 16 16" width={size} style={{ color: "currentcolor" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8.75 4V4.75V8H11.25H12V9.5H11.25H8H7.25V8.75V4.75V4H8.75Z" fill="currentColor" />
  </svg>
);
