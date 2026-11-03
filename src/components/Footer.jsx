import {
  CreatedBy,
  CreatedByLink,
  FooterContent,
  FooterLink,
  FooterLinks,
  HomeFooter,
} from "../styles/Footer.Styles";

const Footer = () => {
  return (
    <HomeFooter>
      <FooterContent>
        <CreatedBy>
          Developer{" "}
          <CreatedByLink
            href="https://github.com/mjfernandez02"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="currentColor"
              style={{ display: "block" }}
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.21-.02-2.18-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18A11.08 11.08 0 0 1 12 6.95c.98 0 1.97.13 2.89.38 2.2-1.5 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            <span>github.com/mjfernandez02</span>
          </CreatedByLink>
        </CreatedBy>

        <FooterLinks>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
        </FooterLinks>
      </FooterContent>
    </HomeFooter>
  );
};

export default Footer;
